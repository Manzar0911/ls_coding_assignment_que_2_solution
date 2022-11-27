
async function init() {
    try {
        const results = await Promise.all([
            fetch('https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json').then((response) => response.json()),
            fetch('https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json').then((response) => response.json()),
        ]);
        var data = solve(results);
        show(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

init();

function solve(res){
    let data=[];
    for(let r of res[1].cafes){
        for(let p of res[0].places){
            if(p.id === r.location_id){
                data.push({
                    "name": r.name,
                    "street_no": p.street_no,
                    "locality": p.locality,
                    "postal_code": p.postal_code,
                    "lat": p.lat,
                    "long": p.long,
                });
            }
        }
    }
    return data;
}

function show(data) {
    let tab = "";
    let i=1;
    for (let r of data) {
        tab += `<tr> 
    <td>${i++}</td>
    <td>${r.name} </td>
    <td>${r.street_no} ${r.locality}</td>
    <td>${r.postal_code}</td> 
    <td>${r.lat}</td>
    <td>${r.long}</td>          
    </tr>`;
    }
    document.getElementById("myTable").innerHTML = tab;
}

const tableSearch = () => {
    let filter = document.getElementById('myInput').value.toUpperCase();
    
    let myTable = document.getElementById('myTable');

    let tr = myTable.getElementsByTagName('tr');
    console.log(tr);
    for(var i=0 ; i<tr.length ; i++){
        let  td = tr[i].getElementsByTagName('td')[1];
        if(td){
            let textValue = td.textContent || td.innerHTML;
            if(textValue.toUpperCase().indexOf(filter) > -1){
                tr[i].style.display = "";
            }
            else{
                tr[i].style.display = "none";
            }
        }
    }
}