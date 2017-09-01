function CopyObj(o) {
    // Copy by value
    return JSON.parse(JSON.stringify(o));
}

function FisherYatesShuffle(arr) {
    var shuffled = arr.slice(0); // Copy by value
    for (var i = arr.length-1; i > 0; i--) {
        // 1 <= i <= n-1
        var j = Math.floor(Math.random()*(i+1)); // 0 <= j <= i
        // Swap i and j, copying by value
        var temp = CopyObj(shuffled[i]);
        shuffled[i] = CopyObj(shuffled[j]);
        shuffled[j] = temp;
    }
    return shuffled;
}
