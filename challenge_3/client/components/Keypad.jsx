import React from 'react';
import KeypadButton from './KeypadButton.jsx';

export default (props) => {
  var layout = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [0, 10, '?']
  ];

  var handlePress = (i) => {
    var n = i;
    if (i === '?') {
      n = Math.floor((10 + 1) * Math.random());
    }
    console.log(n);
  }

  return (
    <table>
      <tbody>
        {
          layout.map((row, i) => {
            return (
              <tr key={i}>
                {
                  row.map((cell, i)=> {
                    return (
                      <td key={i}>
                        <KeypadButton pins={cell} hitPins={handlePress}/>
                      </td>
                    )
                  })
                }
              </tr>
            );

          })
        }
      </tbody>
    </table>
  )

}