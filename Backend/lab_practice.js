// =============================Question No 1 ============


// let name = "sachin dangi"
// console.log(name.length)
// let count = name.split("i").length;
// console.log(count-1)


// for(let i of name){
//     // console.log(i);

//     let count = `${i} => ${name.split(i).length-1}`
//     console.log(count);
// };


// =============================Question No 2 ============

let arr = [6, 9, 3, 5, 6, 4];

function sum_digits(arr) {
    let sum = arr.reduce((update_num, num) => update_num + num, 0,); 
// console.log(sum);

    for (; sum > 10;) {
        // console.log(sum);
    //     let duplicate_sum =sum.toString().split("")
    //     // console.log(duplicate_sum);
    //    let sum2 = duplicate_sum.reduce((update,current)=>update+parseInt(current),0);
    //    console.log(sum2)

        sum = sum.toString().split('').reduce((update_num, digit) => update_num + parseInt(digit), 0);
    }
    
    return sum;
    
}

// console.log(sum_digits(arr));
// sum_digits(arr);


// =============================Question No 3 ============

let name = "sachin singh dangi";

let reversedName = name
  .split(' ') 
  .map(part => part.split('').reverse().join(''))
  .join(' '); 

console.log(reversedName);

