Vue.config.devtools = true

const app = new Vue({
    el: '#app',
    data: {
        id: '',
        taskDraft: '',
        editMode: false,
        todos: []
    },
    mounted () {
        this.getTasks()
    },
    methods: {
        getTasks () {
            axios(
                { method: 'GET', url: '/api/tasks' }
            ).then(
                result => {
                    this.todos = result.data
                },
                error => {
                    console.error(error)
                }
            )
        },
        addNewTask () {
            if (!this.taskDraft) {
                alert('Task title required')
                return false
            }
            axios.post('/api/task',
                { title: this.taskDraft }
            ).then((response) => {
                this.taskDraft = ''
                this.getTasks()
            }).catch((error) => {
                console.log(error)
            })
        },
        updateTask () {
            if (!this.taskDraft) {
                alert('Task title required')
                return false
            }
            axios.put(`/api/task/${this.id}`,
                { title: this.taskDraft }
            ).then((res) => {
                this.taskDraft = ''
                this.editMode = false
                this.getTasks()
            }).catch((err) => {
                console.log(err)
            })
        },
    }
})

Vue.component('todo-item', {
    props: ['todo'],
    template: `
        <li>
            <button v-on:click="editTask(todo.title, todo._id)">Edit</button>
            <label>
                <input type="checkbox">
                <span class="todo-item">{{ todo.title }}</span>
            </label>
            <button v-on:click="deleteTask(todo._id)">X</button>
        </li>
        `,
    methods: {
        editTask(title, id) {
            app.id = id
            app.taskDraft = title
            app.editMode = true
        },
        deleteTask (id) {
            const message = `Are you sure you want to delete this?`
            const answer = confirm(message)
            if (answer !== true) {
                return false
            }
            axios.delete(`/api/task/${id}`
            ).then((response) => {
                app.getTasks()
            }).catch((error) => {
                console.log(error)
            })
        }
    }
})

