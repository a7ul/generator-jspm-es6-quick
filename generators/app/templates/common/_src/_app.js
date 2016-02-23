//import scss
import './styles/main.scss!';

<% if(framework === 'react'){ %>
  //import entry point scripts
  import './scripts/main.jsx';
<% } else { %>
  //import entry point scripts
  import './scripts/main.js';
<% } %>
