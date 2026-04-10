<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html>
<head>
<title><xsl:value-of select="rss/channel/title"/></title>
<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
}
h1, h2, h3 {
  color: #2c3e50;
}
a {
  color: #3498db;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
.item {
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.date {
  color: #7f8c8d;
  font-size: 0.9em;
  margin-bottom: 10px;
}
.description {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}
.footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  text-align: center;
  color: #7f8c8d;
  font-size: 0.9em;
}
</style>
</head>
<body>
<h1><xsl:value-of select="rss/channel/title"/></h1>
<p><xsl:value-of select="rss/channel/description"/></p>
<p><a href="{rss/channel/link}">访问网站</a></p>

<xsl:for-each select="rss/channel/item">
<div class="item">
<h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
<div class="date"><xsl:value-of select="pubDate"/></div>
<div class="description">
<xsl:value-of select="description" disable-output-escaping="yes"/>
</div>
</div>
</xsl:for-each>

<div class="footer">
<p>这是RSS订阅源，您可以使用RSS阅读器订阅</p>
<p><a href="{rss/channel/atom:link/@href}">订阅链接</a></p>
</div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>