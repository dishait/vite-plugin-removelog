import { defineComponent } from "vue"

export const Hello = defineComponent({
    render() {
        console.log("Tsx")
        return <div>Hello, World!!</div>
    }
})