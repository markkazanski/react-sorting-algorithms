export const swap = (array, firstIndex, secondIndex) => {
    //console.log("swap", "first", firstIndex, array[firstIndex], "second val", secondIndex, array[secondIndex]);
    const firstValue = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = firstValue;
}

export const indexOfMinimum = (array, startIndex) => {
    let minIndex = startIndex;
    for(let i=startIndex; i<array.length; i++){
        if(array[i] < array[minIndex])
            minIndex = i;
    }
    return minIndex;
}

export const insert = (array, rightIndex, value) => {
    for(var j = rightIndex;
        j >= 0 && array[j] > value;
        j--) {
        array[j + 1] = array[j];
    }   
    array[j + 1] = value; 
    return j + 1;
};

export const merge = function(array, p, q, r) {
    var lowHalf = [];
    var highHalf = [];

    var k = p;
    var i;
    var j;
    for (i = 0; k <= q; i++, k++) {
        lowHalf[i] = array[k];
    }
    for (j = 0; k <= r; j++, k++) {
        highHalf[j] = array[k];
    }

    k = p;
    i = 0;
    j = 0;
    
    // Repeatedly compare the lowest untaken element in
    //  lowHalf with the lowest untaken element in highHalf
    //  and copy the lower of the two back into array
    while(i < lowHalf.length && j < highHalf.length){
        if(lowHalf[i] < highHalf[j]){
            array[k] = lowHalf[i];
            k++;
            i++;
        } else {
            array[k] = highHalf[j];
            k++;
            j++;  
        }
    }

    
    
    // Once one of lowHalf and highHalf has been fully copied
    //  back into array, copy the remaining elements from the
    //  other temporary array back into the array
    while(i < lowHalf.length){
        array[k] = lowHalf[i];
        k++;
        i++;
    }
    
    while(i < highHalf.length){
        array[k] = highHalf[j];
        k++;
        j++;
    }
    
};

export const randomIntFromInterval = (min,max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
}
