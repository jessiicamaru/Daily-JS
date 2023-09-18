import html from '../core.js';
import { connect } from '../store.js';

function TodoList({ todos, filter, filters }) {
    return html`
        <footer class="footer">
            <span class="todo-count"><strong>${todos.filter((todo) => todo.complete === false).length}</strong> item left</span>
            <ul class="filters">
                ${Object.keys(filters).map(
                    (key) => html`
                        <li>
                            <a class="${filter === key && 'selected'}" href="#" onclick="dispatch('switchFillter', '${key}')">
                                ${key[0].toUpperCase() + key.slice(1)}
                            </a>
                        </li>
                    `
                )}
            </ul>
            <button class="clear-completed" onclick="dispatch('clearComplete')">Clear completed</button>
        </footer>
    `;
}

export default connect()(TodoList);
