module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "eslint:recommended"],
    parserOptions: {
        parser: "babel-eslint"
    },
    rules: {
        "no-cond-assign": 2,
        "no-var": 2,
        "no-const-assign": 2,
        "no-irregular-whitespace": 2,
        "no-multi-spaces": 2,
        "no-multiple-empty-lines": [
            2,
            {
                max: 2
            }
        ],
        "comma-dangle": [2, "never"],
        "comma-spacing": 2,
        "semi": [2, "always"],
        "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]
    }
};