function getDays(days) {
  buff = '<th></th>'
  for (var i = 1; i <= days; i++) {
    buff += '<th> Day ' + i + ' </th>'
  }
  return buff
}



document.open()
document.write(
  `<body>
    <table border=1px class='table'>
      <thead id="headers">`
        /* days here */
        + getDays(8) +
      `</thead>`
        /* rows here */

        + `<tbody>
        </tr>
          <tr height="5">
          <td width="30" class="HorColHeader" valign="top" rowspan="1">09:40<br>10:40</td>
          <td width="5" class="HorCellOdd" rowspan="1">INF464-00002<br>Informatique<br>Dumont,&nbsp;I.<br>B-011</td>
          <td width="5" class="HorCellOdd" rowspan="1">HQC404-00404<br>Histoire QC/CAN<br>Hébert,&nbsp;A.<br>B-119</td>
          <td width="5" class="HorCellOdd" rowspan="1">SCT404E-00404<br>Science tech.<br>Savaria,&nbsp;M.<br>B-14</td>
          <td width="5" class="HorCellOdd" rowspan="1">INF464-00002<br>Informatique<br>Dumont,&nbsp;I.<br>B-011</td>
          <td width="5" class="HorCellOdd" rowspan="1">EPS402-00002<br>Éduc. physique<br>Angel,&nbsp;M.<br>S-9.1</td>
          <td width="5" class="HorCellOdd" rowspan="1">HQC404-00404<br>Histoire QC/CAN<br>Hébert,&nbsp;A.<br>B-119</td>
          <td width="5" class="HorCellOdd" rowspan="1">FRA406E-00404<br>Français<br>Lahaie,&nbsp;G<br>B-120</td>
          <td width="5" class="HorCellOdd" rowspan="1">HQC404-00404<br>Histoire QC/CAN<br>Hébert,&nbsp;A.<br>B-119</td>
          </tr>

          <tr height="5">
          <td width="30" class="HorColHeader" valign="top" rowspan="1">10:52<br>11:52</td>
          <td width="5" class="HorCellEven" rowspan="1">FRA406E-00404<br>Français<br>Lahaie,&nbsp;G<br>B-120</td>
          <td width="5" class="HorCellEven" rowspan="1">MAT406E-00404<br>SN<br>Rémy&nbsp;M.-C.<br>A-202</td>
          <td width="5" class="HorCellEven" rowspan="1">HQC404-00404<br>Histoire QC/CAN<br>Hébert,&nbsp;A.<br>B-119</td>
          <td width="5" class="HorCellEven" rowspan="1">MAT406E-00404<br>SN<br>Rémy&nbsp;M.-C.<br>A-202</td>
          <td width="5" class="HorCellEven" rowspan="1">ECR404-00404<br>Eth. cult. rel.<br>Desrochers&nbsp;L<br>B-118</td>
          <td width="5" class="HorCellEven" rowspan="1">DRA402-00001<br>Art dramatique<br>Dumesnil,&nbsp;M<br>B-204<br><b>Conflit:</b><br>ECR404-00404<br>Eth. cult. rel.<br>Desrochers&nbsp;L<br>B-118</td>
          <td width="5" class="HorCellEven" rowspan="1">SCT404E-00404<br>Science tech.<br>Savaria,&nbsp;M.<br>B-14</td>
          <td width="5" class="HorCellEven" rowspan="1">EESL406-00003<br>Anglais enrichi<br>Beaton&nbsp;K.<br>B-104</td>
          </tr>

          <tr height="5">
          <td width="30" class="HorColHeader" valign="top" rowspan="1">12:04<br>13:04</td>
          <td width="5" class="HorCellOdd" rowspan="1">MAT406E-00404<br>SN<br>Rémy&nbsp;M.-C.<br>A-202</td>
          <td width="5" class="HorCellOdd" rowspan="1">SCT404E-00404<br>Science tech.<br>Savaria,&nbsp;M.<br>B-14</td>
          <td width="5" class="HorCellOdd" rowspan="1">FRA406E-00404<br>Français<br>Lahaie,&nbsp;G<br>B-120</td>
          <td width="5" class="HorCellOdd" rowspan="1">FRA406E-00404<br>Français<br>Lahaie,&nbsp;G<br>B-120</td>
          <td width="5" class="HorCellOdd" rowspan="1">SCT404E-00404<br>Science tech.<br>Savaria,&nbsp;M.<br>B-14</td>
          <td width="5" class="HorCellOdd" rowspan="1">MAT406E-00404<br>SN<br>Rémy&nbsp;M.-C.<br>A-202</td>
          <td width="5" class="HorCellOdd" rowspan="1">EESL406-00003<br>Anglais enrichi<br>Beaton&nbsp;K.<br>B-104</td>
          <td width="5" class="HorCellOdd" rowspan="1">SCT404E-00404<br>Science tech.<br>Savaria,&nbsp;M.<br>B-14</td>
          </tr>

          <tr height="5">
          <td width="30" class="HorColHeader" valign="top" rowspan="1">13:04<br>13:54</td>
          <td width="5" class="HorCellEven" rowspan="1">ABS400-00404<br>Étude/ Activité<br>Germain,&nbsp;L.<br></td>
          <td width="5" class="HorCellEven" rowspan="1">ABS400-00404<br>Étude/ Activité<br>Germain,&nbsp;L.<br></td>
          <td width="5" class="HorCellEven" rowspan="1">ABS400-00404<br>Étude/ Activité<br>Germain,&nbsp;L.<br></td>
          <td width="5" class="HorCellEven" rowspan="1">ABS400-00404<br>Étude/ Activité<br>Germain,&nbsp;L.<br></td>
          <td width="5" class="HorCellEven" rowspan="1">ABS400-00404<br>Étude/ Activité<br>Germain,&nbsp;L.<br></td>
          <td width="5" class="HorCellEven" rowspan="1">ABS400-00404<br>Étude/ Activité<br>Germain,&nbsp;L.<br></td>
          <td width="5" class="HorCellEven" rowspan="1">ABS400-00404<br>Étude/ Activité<br>Germain,&nbsp;L.<br></td>
          <td width="5" class="HorCellEven" rowspan="1">ABS400-00404<br>Étude/ Activité<br>Germain,&nbsp;L.<br></td>
          </tr>

          <tr height="5">
          <td width="30" class="HorColHeader" valign="top" rowspan="1">13:54<br>14:54</td>
          <td width="5" class="HorCellOdd" rowspan="1">ECR404-00404<br>Eth. cult. rel.<br>Desrochers&nbsp;L<br>B-118</td>
          <td width="5" class="HorCellOdd" rowspan="1">EESL406-00003<br>Anglais enrichi<br>Beaton&nbsp;K.<br>B-104</td>
          <td width="5" class="HorCellOdd" rowspan="1">DRA402-00001<br>Art dramatique<br>Dumesnil,&nbsp;M<br>B-204</td>
          <td width="5" class="HorCellOdd" rowspan="1">EESL406-00003<br>Anglais enrichi<br>Beaton&nbsp;K.<br>B-104</td>
          <td width="5" class="HorCellOdd" rowspan="1">FRA406E-00404<br>Français<br>Lahaie,&nbsp;G<br>B-120</td>
          <td width="5" class="HorCellOdd" rowspan="1">SCT404E-00404<br>Science tech.<br>Savaria,&nbsp;M.<br>B-14</td>
          <td width="5" class="HorCellOdd" rowspan="1">INF464-00002<br>Informatique<br>Dumont,&nbsp;I.<br>B-011</td>
          <td width="5" class="HorCellOdd" rowspan="1">MAT406E-00404<br>SN<br>Rémy&nbsp;M.-C.<br>A-202</td>
          </tr>

          <tr height="5">
          <td width="30" class="HorColHeader" valign="top" rowspan="1">15:05<br>16:00</td>
          <td width="5" class="HorCellEven" rowspan="1">SCT404E-00404<br>Science tech.<br>Savaria,&nbsp;M.<br>B-14</td>
          <td width="5" class="HorCellEven" rowspan="1">EPS402-00002<br>Éduc. physique<br>Angel,&nbsp;M.<br>S-9.1</td>
          <td width="5" class="HorCellEven" rowspan="1">MAT406E-00404<br>SN<br>Rémy&nbsp;M.-C.<br>A-202</td>
          <td width="5" class="HorCellEven" rowspan="1">HQC404-00404<br>Histoire QC/CAN<br>Hébert,&nbsp;A.<br>B-119</td>
          <td width="5" class="HorCellEven" rowspan="1">EESL406-00003<br>Anglais enrichi<br>Beaton&nbsp;K.<br>B-104</td>
          <td width="5" class="HorCellEven" rowspan="1">FRA406E-00404<br>Français<br>Lahaie,&nbsp;G<br>B-120</td>
          <td width="5" class="HorCellEven" rowspan="1">DRA402-00001<br>Art dramatique<br>Dumesnil,&nbsp;M<br>B-204</td>
          <td width="5" class="HorCellEven" rowspan="1">EPS402-00002<br>Éduc. physique<br>Angel,&nbsp;M.<br>S-9.1</td>
          </tr>

          <tr height="5">
          <td width="30" class="HorColHeader" valign="top" rowspan="1">16:10<br>16:50</td>
          <td width="5" class="HorCellOdd" rowspan="1">ABS400-00404<br>Étude/ Activité<br>Germain,&nbsp;L.<br></td>
          <td width="5" class="HorCellOdd" rowspan="1">ABS400-00404<br>Étude/ Activité<br>Germain,&nbsp;L.<br></td>
          <td width="5" class="HorCellOdd" rowspan="1">ABS400-00404<br>Étude/ Activité<br>Germain,&nbsp;L.<br></td>
          <td width="5" class="HorCellOdd" rowspan="1">ABS400-00404<br>Étude/ Activité<br>Germain,&nbsp;L.<br></td>
          <td width="5" class="HorCellOdd" rowspan="1">ABS400-00404<br>Étude/ Activité<br>Germain,&nbsp;L.<br></td>
          <td width="5" class="HorCellOdd" rowspan="1">ABS400-00404<br>Étude/ Activité<br>Germain,&nbsp;L.<br></td>
          <td width="5" class="HorCellOdd" rowspan="1">ABS400-00404<br>Étude/ Activité<br>Germain,&nbsp;L.<br></td>
          <td width="5" class="HorCellOdd" rowspan="1">ABS400-00404<br>Étude/ Activité<br>Germain,&nbsp;L.<br></td>
          </tr>
        </tbody>` +
    `</table>
  </body>`
)
document.close()


/*
<body>
  <table style="border: 5px solid #000">
    <thead id="headers" onload="addDays()">
      <!-- add shit here -->
    </thead>
    <tr>

    </tr>
  </table>
</body>
*/
