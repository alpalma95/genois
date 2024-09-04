const test = 
    JSON.parse(await Deno.readTextFile("genois.json"));

console.log(test);