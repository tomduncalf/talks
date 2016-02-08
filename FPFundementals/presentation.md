output: presentation.html

--

# FP Fundamentals
## Functors, monads and more
<br>
<center><small>Tom Duncalf | <a href='mailto:tom@tomduncalf.com'>tom@tomduncalf.com</a> | <a href='https://twitter.com/tomduncalf'>@tomduncalf</a></small></center>

--

### Why?

* A lot of interest in FP at the minute
* Some of the fundamental concepts (functors, monads etc.) are sometimes made to seem very complicated
* The basic concepts are actually quite simple (and useful)
* Don't have to use a pure FP language - examples in Javascript
* I am not an expert :)

--

### The book this is based on

<center>
  <img src='./book.png' width='50%'>
  <small>https://github.com/MostlyAdequate/mostly-adequate-guide</small>
</center>

--

### Concepts we'll cover

* First class functions
* Pure functions
* Currying
* Composition
* Point-free style
* Hindley-Milner type signatures
* Functors
* Monads

--

# Basic concepts

--

### First class functions

--

### First class functions

* Functions are treated just like any other data type
* They can be passed around, stored in arrays, etc.
* They are only called when invoked with `()`

```javascript
var hi = function(name){
  return "Hi " + name;
};

// This:
var greeting = function(name) {
  return hi(name);
};

// ...is the same as:
var greeting = hi;
```

* Wrapping `function` is not needed

---

### First class functions

```javascript
// This:
var getServerStuff = function(callback){
  return ajaxCall(function(json){
    return callback(json);
  });
};

// ...is the same as:
var getServerStuff = ajaxCall;
```

---

### First class functions

```javascript


  return ajaxCall(function(json){
    return callback(json);
  });
```

---

### First class functions

```javascript

  // This:
  return ajaxCall(function(json){
    return callback(json);
  });

  // ...is the same as
  return ajaxCall(callback)
```

---

### First class functions

```javascript
// This:
var getServerStuff = function(callback){
  ajaxCall(callback);
};

// ...is the same as:
var getServerStuff = ajaxCall;
```

---

### First class functions

* Less code, more readable
* Easier to change function arguments - no need to update in multiple places
* Reduces the need to name arguments which allows us to write more generic code - common theme in FP

```javascript
// specific to our current blog
var validArticles = function(articles) {
  return articles.filter(function(article){
    return article !== null && article !== undefined;
  });
};

// vastly more relevant for future projects
var compact = function(xs) {
  return xs.filter(function(x) {
    return x !== null && x !== undefined;
  });
};
```

---

### Pure functions

---

### Pure functions

* A pure function is a function that, given the same input, will always return the same output and does not have any observable side effect.
