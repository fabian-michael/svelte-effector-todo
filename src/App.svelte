<script>
	import {todos, openTodos, doneTodos, todosApi} from './state/todos.store';
	import { Form, Field, ErrorMessage } from 'svelte-forms-lib';
	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
	import * as yup from 'yup';
	import TodoItem from './components/TodoItem.svelte';

	const formProps = {
		initialValues: { todo: "" },
		validationSchema: yup.object().shape({
			todo: yup
				.string()
				.required()
		}),
		onSubmit: async ({todo}) => {
			todosApi.addTodo(todo);
		},
	}
</script>


<style>
	
</style>

<div class="h-screen p-8 bg-gray-100 app">
	<div class="container max-w-lg">
		<div class="p-4 text-white bg-gray-800 rounded-lg shadow-xl">
			<Form {...formProps}>
				<label for="todo">Todo Title</label>
				<div class="">
					<div class="flex">
						<Field name="todo" id="todo" placeholder="Lorem ipsum ..." />
						<button type="submit" class="px-2 py-1 ml-4 bg-blue-500 rounded">Add</button>
					</div>
					<ErrorMessage name="todo" />
				</div>
			</Form>
		</div>
		
		<div class="mt-8">All</div>
		<ul>
			{#each $todos as todo}
				<TodoItem {todo} />
			{/each}
		</ul>

		<div class="mt-8">Open</div>
		<ul>
			{#each $openTodos as todo}
				<TodoItem {todo} />
			{/each}
		</ul>

		<div class="mt-8">Done</div>
		<ul>
			{#each $doneTodos as todo}
				<TodoItem {todo} />
			{/each}
		</ul>

		
	</div>
</div>
