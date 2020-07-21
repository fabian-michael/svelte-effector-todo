<script>
    import {todosApi} from '../state/todos.store';

    export let todo;

    function handleToggle() {
        todosApi.setDone({
            id: todo.id,
            done: this.checked,    
        })
    }
</script>

<li>{JSON.stringify(todo)} <input type="checkbox" on:change={handleToggle} checked={todo.done} /></li>