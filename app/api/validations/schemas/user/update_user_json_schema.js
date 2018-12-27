const jsonUpdate = {
    'definitions': {},
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': 'http://example.com/root.json',
    'type': 'object',
    'title': 'The Root Schema',
    'required': [
        'newUsername',
        'username',
        'newPassword',
        'password',
        '_id'
    ],
    'properties': {
        'username': {
            '$id': '#/properties/username',
            'type': 'string',
            'title': 'The Title Schema',
            'default': '',
            'minLength': 1,
            'examples': [
                '123'
            ],
            'pattern': '^(.*)$'
        },
        'newUsername': {
            '$id': '#/properties/newUsername',
            'type': 'string',
            'title': 'The Title Schema',
            'default': '',
            'minLength': 1,
            'examples': [
                '1234'
            ],
            'pattern': '^(.*)$'
        },
        'newPassword': {
            '$id': '#/properties/newPassword',
            'type': 'string',
            'title': 'The Category Schema',
            'default': '',
            'minLength': 1,
            'examples': [
                '1234'
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
        },
        '_id': {
            '$id': '#/properties/_id',
            'type': 'string',
            'title': 'The _id Schema',
            'default': '',
            'minLength': 1,
            'examples': [
                '5be5e1a9a4f03e0030405b4d'
            ],
            'pattern': '^(.*)$'
        }
    }
};

function getUpdateSchemaJson(){
    return jsonUpdate;
}

module.exports = getUpdateSchemaJson;
