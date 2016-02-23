SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  transpiler: "plugin-babel",
  babelOptions: {
      <% if(framework === 'react'){ %>
      "plugins": ["babel-plugin-transform-react-jsx"],
      <% } %>
       "optional": [
         "runtime"
      ],
      blacklist: []
    },
  map: {
  },

  packages: {
  }
});
