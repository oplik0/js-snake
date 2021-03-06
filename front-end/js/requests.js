function insertIntoDB(nick, score, moves) {
    (function ($) {
        var url = 'https://node-backend-snakemi16.herokuapp.com/insertRanking'
        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                "nick": nick,
                "score": score,
                "move": moves
            })
        }
        )
    })(jQuery);
}
function fetchRanking() {
    $.getJSON('https://node-backend-snakemi16.herokuapp.com/ranking', function (data) {
        console.log(data);
        const holder = document.getElementById("tabela_holder")
        holder.innerHTML = ""
        const table = document.createElement("table")
        table.id = "tabela"
        table.innerHTML = "<tr><th>Nick</th><th>Wynik</th><th>Ruchy</th></tr>"
        const tableContent = data.map(element => {
            //debug
            console.log(element["nick"])
            console.log(element["score"])
            console.log(element["moves"])
            const tr = document.createElement("tr")
            const nick = document.createElement("td")
            nick.innerText = element["nick"]
            tr.appendChild(nick)
            const score = document.createElement("td")
            score.innerText = element["score"]
            tr.appendChild(score)
            const moves = document.createElement("td")
            moves.innerText = element["moves"]
            tr.appendChild(moves)
            return tr
        });
        table.appendChild(tableContent)
        holder.appendChild(table);
    });

    setTimeout(function () {
        sortTable();
    }, 500);
}
function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("tabela");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];
            if (Number(x.innerHTML) < Number(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}