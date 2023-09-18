import html from '../core.js';
import { connect } from '../store.js';

function TodoIteam({ todo, index, editIndex }) {
    return html` <li class="${(todo.complete && 'completed') || ' '} ${editIndex == index && 'editing'}">
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.complete && 'checked'} onclick="dispatch('toggle', ${index})" />
            <label ondblclick="dispatch('startEdit',${index})">${todo.title}</label>
            <button class="destroy" onclick="dispatch('delete', ${index})"></button>
        </div>
        <input
            class="edit"
            value="${todo.title}"
            onkeydown="event.keyCode === 13 && this.value.trim() !== '' && dispatch('saveEdit', this.value) || event.keyCode === 27 && this.value.trim() !== '' && dispatch('endEdit')"
            onblur="dispatch('endEdit')"
        />
    </li>`;
}

export default connect()(TodoIteam);
