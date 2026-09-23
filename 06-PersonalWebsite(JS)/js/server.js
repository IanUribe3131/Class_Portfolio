const actionCalendar = document.querySelector('.tableBody');
const actionForm = document.getElementById('schedule-form');


const createNewRow = (date, start, end, description, place, type, notes, flagColor, isFree) => {

    const row = document.createElement('tr');

    const colorHex = flagColor.startsWith('#') ? flagColor : `#${flagColor}`;

    row.innerHTML = `
        <td>${date}</td>
        <td>${start}</td>
        <td>${end}</td>
        <td>${description}</td>
        <td>${place}</td>
        <td style="text-transform: capitalize;">${type}</td>
        <td>${notes || '-'}</td>
        <td style="text-align: center;">
            <span style="display: inline-block; width: 14px; height: 14px; border-radius: 50%; background-color: ${colorHex}; margin-right: 6px; vertical-align: middle;"></span>
            <small>${isFree ? 'Free' : 'Busy'}</small>
        </td>
    `;
    
    actionCalendar.appendChild(row);
};

actionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const activity = document.getElementById('activity').value;
    const place = document.getElementById('place').value;
    const type = document.getElementById('type').value;
    const notes = document.getElementById('notes').value;
    const flag = document.getElementById('flag').value;
    const isFree = document.getElementById('free-busy').checked;

    createNewRow(date, start, end, activity, place, type, notes, flag, isFree);

    actionForm.reset();
})