const {Client} = require('pg');
const client = new Client();

client.connect();

function query(message, success, failure) {

    if (message.resource === 'features') {

        const west      = parseFloat(message.args.west);
        const north     = parseFloat(message.args.north);
        const east      = parseFloat(message.args.east);
        const south     = parseFloat(message.args.south);

        const tolerance = message.args.zoom > 15 ? 0 : parseFloat(1 / Math.pow(message.args.zoom, 2.5));

        function getQuery(table) {

            return `
            SELECT json_build_object(
                'type',         'Feature',
                'id',           gnis_id,
                'geometry',     ST_AsGeoJSON(
                                    ST_Simplify(wkb_geometry, ${tolerance})
                                )::json,
                'properties',   json_build_object(
                    'name',     gnis_name,
                    'type',     ftype
                 )
            ) FROM (
                SELECT gnis_id, wkb_geometry, gnis_name, ftype
                FROM ${table}
                WHERE gnis_name IS NOT NULL
                AND wkb_geometry &&
                ST_MakeEnvelope (
                    ${west}, ${north},
                    ${east}, ${south},
                    3857
                )
            ) AS subquery`;

        }

        client.query(`
            ${getQuery('nhdwaterbody')}
            UNION ALL
            ${getQuery('nhdflowline')}
        `).then(result => {

            success(result.rows.map(row => row.json_build_object), message.type);

        }).catch(failure);

    }

}

module.exports = query;
