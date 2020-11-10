import {
    Resolver,
    Mutation,
    Arg,
    Int,
    Query,
    InputType,
    Field
} from "type-graphql";
import { Todo } from "../entity/Todo";

@InputType()
class TodoInput {
    @Field()
    title: string;

    @Field(() => Boolean)
    completed: boolean;
}

@InputType()
class TodoUpdateInput {
    @Field(() => String, { nullable: true })
    title: string;

    @Field(() => Boolean, { nullable: true })
    completed: boolean;
}

@Resolver()
export class TodoResolver {
    @Mutation(() => Todo)
    async createTodo(@Arg("options", () => TodoInput) options: TodoInput) {
        const todo = await Todo.create(options).save();
        return todo;
    }

    @Mutation(() => Boolean)
    async updateTodo(
        @Arg("id", () => Int) id: number,
        @Arg("input", () => TodoUpdateInput) input: TodoUpdateInput
    ) {
        await Todo.update({ id }, input);
        return true;
    }

    @Mutation(() => Boolean)
    async deleteTodo(@Arg("id", () => Int) id: number) {
        await Todo.delete({ id });
        return true;
    }

    @Query(() => [Todo])
    todos() {
        return Todo.find();
    }
}