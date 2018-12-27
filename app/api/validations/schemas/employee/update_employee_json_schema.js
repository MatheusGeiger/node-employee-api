const jsonUpdate = {
    'definitions': {},
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': 'http://example.com/root.json',
    'type': 'object',
    'title': 'The Root Schema',
    'required': [
        'firstName',
        'lastName',
        'participation',
        '_id'
    ],
    'properties': {
        'firstName': {
            '$id': '#/properties/firstName',
            'type': 'string',
            'title': 'The Title Schema',
            'default': '',
            'minLength': 1,
            'examples': [
                'Matheus'
            ],
            'pattern': '^(.*)$'
        },
        'lastName': {
            '$id': '#/properties/lastName',
            'type': 'string',
            'title': 'The Category Schema',
            'default': '',
            'minLength': 1,
            'examples': [
                'Geiger'
            ],
            'pattern': '^(.*)$'
        },
        'participation': {
            '$id': '#/properties/participation',
            'type': 'integer',
            'title': 'The Percentagediscount Schema',
            'minLength': 1,
            'minimum': 0, 
            'maximum': 100,
            'default': 0,
            'examples': [
                20
            ]
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
        },
    }
};

function getUpdateSchemaJson(){
    return jsonUpdate;
}

module.exports = getUpdateSchemaJson;
