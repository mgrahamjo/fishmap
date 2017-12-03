#!/bin/bash

. ./bin/util.sh

path="$1"

mkdir -p $path

dashed_name="${path##*/}"

camel_case_name=$(echo $dashed_name | perl -pe 's/(-)(\w)/\U$2/g')

cat >$path/index.js <<EOL
import uav from 'uav';

function ${camel_case_name}() {

    ${camel_case_name}.component = uav.component(\`
    <div class="${dashed_name}">
        <div>{foo}</div>
    </div>\`, {
        foo: 'bar'
    });

    return ${camel_case_name}.component;

}

export default ${camel_case_name};
EOL

cat >$path/$dashed_name.scss <<EOL
.${dashed_name} {
    display: block;
}
EOL

print_green "✓ Added a component in $path"

print_blue "You still need to import $path/$dashed_name.scss before its styles will be included."
