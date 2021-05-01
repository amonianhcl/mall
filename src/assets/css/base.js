@import "./normalize.css";

/* 定义全局样式变量*/
:root {
  --color-text: #666;
  --color-high-text: #9254de;
  --color-tint: #d3adf7;
  --color-background: white;
  --font-size: 14px;
  --line-height: 1.5;
}

*,
*::before,
*::after{
  margin:0;
  padding:0;
  box-sizing: border-box;
}

body {
  user-select:none;
  background: var(--color-background);
  color: var(--color-text);
  width: 100vw;
}

a{
  text-decoration: none;
  color: var(--color-tint);
}

img{
  width: 100%;
}