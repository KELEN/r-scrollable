var restArgs = function(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function() {
    var length = Math.max(arguments.length - startIndex, 0);
    var rest = Array(length);
    for (var index = 0; index < length; index++) {
      rest[index] = arguments[index + startIndex];
    }
    // eslint-disable-next-line default-case
    switch (startIndex) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, arguments[0], rest);
      case 2: return func.call(this, arguments[0], arguments[1], rest);
    }
    var args = Array(startIndex + 1);
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index];
    }
    args[startIndex] = rest;
    return func.apply(this, args);
  };
};

var delay = function(func, wait, ...args) {
  return setTimeout(func, wait, ...args); // using rest arguments
};

export function debounce(func, wait, immediate) {
  var timeout, result;

  var later = function(context, args) {
    timeout = null;
    if (args) result = func.apply(context, args);
  };

  var debounced = restArgs(function(args) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      timeout = delay(later, wait, this, args);
    }

    return result;
  });

  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
};

export default debounce