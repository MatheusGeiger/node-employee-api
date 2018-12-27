const jsonAdd = {
    'definitions': {},
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': 'http://example.com/root.json',
    'type': 'object',
    'title': 'The Root Schema',
    'required': [
        'username',
        'password',
    ],
    'properties': {
        'username': {
            '$id': '#/properties/username',
            'type': 'string',
            'title': 'The Title Schema',
            'default': '',
            'minLength': 1,
            'examples': [
                'Matheus'
            ],
            'pattern': '^(.*)$'
        },
        'password': {
            '$id': '#/properties/password',
            'type': 'string',
            'title': 'The Category Schema',
            'default': '',
            'minLength': 1,
            'examples': [
                '123'
            ],
            'pattern': '^(.*)$'
        }
    }
};

function getAddSchemaJson(){
    return jsonAdd;
}

module.exports = getAddSchemaJson;
