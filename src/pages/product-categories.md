---
layout: product-categories
pagination:
  data: products.categories
  size: 1
  alias: productCategories
permalink: 'products/{{ productCategories.title | slugify }}/index.html'
eleventyExcludeFromCollections: true

eleventyComputed:
  title: '{{ productCategories.title | safe }}'

themeColor: true
---
