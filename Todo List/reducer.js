import storage from './until/storage.js';

const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: (todo) => !todo.complete,
        complete: (todo) => todo.complete,
    },
    editIndex: null,
};

const actions = {
    add({ todos }, value) {
        todos.push({
            title: value,
            complete: false,
        });
        storage.set(todos);
    },
    toggle({ todos }, index) {
        todos[index].complete = !todos[index].complete;
        storage.set(todos);
    },
    delete({ todos }, index) {
        todos.splice(index, 1);
        storage.set(todos);
    },
    toggleAll({ todos }, isChecked) {
        todos.forEach((todo) => (todo.complete = isChecked));
        storage.set(todos);
    },
    clearComplete({ todos }) {
        todos.forEach((todo) => (todo.complete = false));
        storage.set(todos);
    },
    switchFillter(state, key) {
        state.filter = key;
        storage.set(state.todos);
    },
    startEdit(state, index) {
        state.editIndex = index;
        storage.set(state.todos);
    },
    saveEdit(state, title) {
        state.todos[state.editIndex].title = title;
        state.editIndex = null;
        storage.set(state.todos);
    },
    endEdit(state) {
        state.editIndex = null;
        storage.set(state.todos);
    },
};

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state, args);
    return state;
}
