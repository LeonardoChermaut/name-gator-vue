<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import AppItemListComponent from "./AppItemList.vue";
import axios from "axios";

export default {
	name: "DomainList",
	components: {
		AppItemListComponent,
	},
	data: function () {
		return {
			items: {
				prefix: [],
				suffix: [],
			},
			domains: [],
			baseURL: String("http://localhost:4000"),
		};
	},
	methods: {
		generateDomains() {
			axios({
				baseURL: this.baseURL,
				method: "post",
				data: {
					query: `
						mutation generateDomains {
							domains: generateDomains {
									name
									checkout
									isAvailable
							}
					}
					`,
				},
			})
				.then((response) => {
					const query = response.data;
					this.domains = query.data.domains;
				})
				.catch(({ response }) =>
					console.error("[ERROR DELETE PREFIXES]", response)
				);
		},
		addItem(item) {
			axios({
				baseURL: this.baseURL,
				method: "post",
				data: {
					query: `
						mutation saveItem($item: ItemInput) {
							newItem: saveItem(item: $item) {
							id
							type
							description
						}
					}
					`,
					variables: {
						item,
					},
				},
			})
				.then((response) => {
					const query = response.data;
					const newItem = query.data.newItem;
					this.items[item.type].push(newItem);
					this.generateDomains();
				})
				.catch(({ response }) =>
					console.error("[ERROR CREATE PREFIXES]", response)
				);
		},
		deleteItem(item) {
			axios({
				baseURL: this.baseURL,
				method: "post",
				data: {
					query: `
						mutation deleteItem($id: Int) {
							deleteItem(id: $id)
					}
					`,
					variables: {
						id: item.id,
					},
				},
			})
				.then(() => {
					this.items[item.type].splice(this.items[item.type].indexOf(item), 1);
				})
				.catch(({ response }) =>
					console.error("[ERROR DELETE PREFIXES]", response)
				);
		},
		async getItems(type) {
			return await axios({
				baseURL: this.baseURL,
				method: "post",
				data: {
					query: `
					query ($type: String) {
						items: items (type: $type) {
							id
							type
							description
						}
					}
				`,
					variables: {
						type: type,
					},
				},
			})
				.then((response) => {
					const query = response.data;
					this.items[type] = query.data.items;
				})
				.catch(({ response }) => console.error("[ERROR GET ITEMS]", response));
		},
	},
	async created() {
		await Promise.all([this.getItems("prefix"), this.getItems("suffix")]).then(
			() => this.generateDomains()
		);
	},
};
</script>

<template>
	<div>
		<div id="main">
			<div class="container">
				<div class="row">
					<div class="col-md">
						<AppItemListComponent
							title="Prefixos"
							type="prefix"
							v-bind:items="items.prefix"
							v-on:add-item="addItem"
							v-on:delete-item="deleteItem"
						/>
					</div>
					<div class="col-md">
						<AppItemListComponent
							title="Sufixos"
							type="suffix"
							v-bind:items="items.suffix"
							v-on:add-item="addItem"
							v-on:delete-item="deleteItem"
						/>
					</div>
				</div>
				<br />
			</div>
			<div class="container">
				<h5>
					Domínios
					<span class="badge badge-secondary">{{ domains.length }}</span>
				</h5>
				<div class="card">
					<div class="card-body">
						<ul class="list-group">
							<li
								class="list-group-item"
								v-for="(domain, index) in domains"
								v-bind:key="`${domain.name}-${index}`"
							>
								<div class="row">
									<div class="col-md-6">
										{{ domain.name }}
									</div>
									<div class="col-md-3">
										<span class="badge badge-pill badge-secondary">{{
											domain.isAvailable ? "Disponível ✅" : "Indisponível ❌"
										}}</span>
									</div>
									<div class="col-md-3 text-right">
										<button
											class="btn btn-outline-success"
											v-bind:href="domain.checkout"
											target="_blank"
											:disabled="!domain.isAvailable"
										>
											<span class="fa fa-shopping-cart"></span>
										</button>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
#slogan {
	margin-top: 30px;
	margin-bottom: 30px;
}

#main {
	background-color: #f1f1f1;
	padding-top: 30px;
	padding-bottom: 30px;
}
</style>
