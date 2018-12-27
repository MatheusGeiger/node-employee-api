module.exports = {
    'extends': 'eslint:recommended',
    'rules': {
        'indent': ['error', 4, {
            'SwitchCase': 1
        }],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'max-len': ['error', 90],
        'complexity': ['error', 6],
        'camelcase': ['error', {
            'properties': 'always'
        }],
        'no-console': 0,
        'new-cap': ['error', {
            'capIsNew': false,
            'newIsCap': false
        }],
        'newline-per-chained-call': ['error', {
            'ignoreChainWithDepth': 2
        }]
    },
    'env': {
        'node': true,
        'es6': true,
        'mocha': true
    },
    'parserOptions': {
        'ecmaVersion': 8,
        'ecmaFeatures': {
            'experimentalObjectRestSpread': true,
            'jsx': true
        },
        'sourceType': 'module'
    },
}  