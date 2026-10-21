const KOM = 3
const ROWS = 10

const kominy = Array.from({length: KOM}, () => Array(ROWS).fill(null));
const wrap = document.getElementById('wrap');
const els = [];

for (let i = 0; i < KOM; i++) 
{
    const box = document.createElement('div');
    const ch = document.createElement('div');
    ch.className = 'komin';
    const wiersz = [];

    for(let j = 0; j < ROWS; j++)
    {
        const d = document.createElement('div');
        d.className = 'wiersz';
        ch.appendChild(d);
        wiersz.push(d);
    }

    const lb = document.createElement('div');
    lb.className = 'label';
    lb.innerText = `Komin ${i + 1}`;
    box.appendChild(lb);
    box.appendChild(ch);
    wrap.appendChild(box);
    els.push(wiersz);
}

let licznik = 0;

function kolor(id)
{
    return "hsl(" + ((id * 137.508) % 360).toFixed(1) + ",70%," + (36 + (id % 3) * 8) + "%)";
}

function render()
{
    kominy.forEach((col, i) => col.forEach((v, j) => 
    {
        const el = els[i][j];
        el.textContent = v === null ? '' : v.wartosc;
        el.style.backgroundColor = v === null ? '' : v.kolor;
    }));
}

function NowaLiczba()
{
    licznik++;
    return {
        wartosc: 1 + Math.floor(Math.random() * 999),
        kolor: kolor(licznik)
    };
}

function Losuj() 
{
    let nowa = NowaLiczba();

    for(let i = 0; i < KOM; i++)
    {
        const out = kominy[i].pop();
        kominy[i].unshift(nowa);
        nowa = out;
    }

    render();
}

let timer = setInterval(Losuj, 1000);

document.getElementById("guzik").onclick = e => 
{
    if(timer)
    {
        clearInterval(timer); timer = null; e.target.innerText = "Wznów";
    }
    else
    {
         timer = setInterval(Losuj, 1000); e.target.innerText = "Pauza";
    };

    render();
 };
