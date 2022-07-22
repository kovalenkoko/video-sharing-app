module.exports = {
    root: true,
    extends: ['airbnb-typescript/base', 'airbnb-typescript'],
    plugins: ['import'],
    parserOptions: {
        project: './tsconfig.eslint.json',
    },
};