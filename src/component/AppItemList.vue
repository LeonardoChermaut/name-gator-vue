<script>
export default {
	name: "AppItemList",
	props: {
		items: {
			type: Array,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			description: "",
		};
	},
	methods: {
		addItem(type, description) {
			this.$emit("add-item", { type, description });
			this.item = "";
		},
		deleteItem(item) {
			this.$emit("delete-item", item);
		},
	},
};
</script>

<template>
	<div class="container">
		<h5>
			{{ title }}
			<span class="badge badge-secondary">{{ items.length }}</span>
		</h5>
		<div class="card">
			<div class="card-body">
				<ul class="list-group">
					<li
						class="list-group-item"
						v-for="item in items"
						v-bind:key="item.id"
					>
						<div class="row">
							<div class="col-md">
								{{ item.description }}
							</div>
							<div class="col-md text-right">
								<button class="btn btn-danger" v-on:click="deleteItem(item)">
									<span class="fa fa-trash"></span>
								</button>
							</div>
						</div>
					</li>
				</ul>
				<br />
				<div class="input-group col-md">
					<input
						class="form-control"
						type="text"
						v-model="description"
						v-on:keyup.enter="addItem(type, description)"
						placeholder="Digite o item"
					/>
					<div class="input-group-append">
						<button
							class="btn btn-outline-primary"
							v-on:click="addItem(type, description)"
						>
							<span class="fa fa-plus"></span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
