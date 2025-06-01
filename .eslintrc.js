module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    // Disable the warning for <img> tags
    '@next/next/no-img-element': 'off',
    // Disable the unused vars warnings for specific files if needed
    '@typescript-eslint/no-unused-vars': ['warn', { 
      varsIgnorePattern: 'onAccept|onFileAccept|onFileReject|onFileValidate|onUpload|maxFiles|maxSize',
      argsIgnorePattern: '^_'
    }],
    // Disable the react-hooks/rules-of-hooks warning for conditional hooks
    'react-hooks/rules-of-hooks': 'warn',
    // Set react-hooks/exhaustive-deps to warn instead of error
    'react-hooks/exhaustive-deps': 'warn',
    // Disable aria role warnings
    'jsx-a11y/role-supports-aria-props': 'off'
  }
}
