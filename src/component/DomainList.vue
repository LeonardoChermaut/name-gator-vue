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
		};
	},
	methods: {
		addItem(item) {
			axios({
				baseURL: "http://localhost:4000",
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
				})
				.catch(({ response }) =>
					console.error("[ERROR CREATE PREFIXES]", response)
				);
		},
		deleteItem(item) {
			axios({
				baseURL: "http://localhost:4000",
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
					this.getItems(item.type);
				})
				.catch(({ response }) =>
					console.error("[ERROR DELETE PREFIXES]", response)
				);
		},
		getItems(type) {
			axios({
				baseURL: "http://localhost:4000",
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

	computed: {
		domains() {
			const domains = [];
			for (const prefix of this.items.prefix) {
				for (const suffix of this.items.suffix) {
					const name =
						String(prefix?.description) + String(suffix?.description);
					const url = name?.toLowerCase();
					const checkout = `https://cart.hostgator.com.br/?pid=d&sld=${url}&tld=.com&domainCycle=2&mode=2r`;
					domains.push({
						name,
						checkout,
					});
				}
			}
			return domains;
		},
	},
	created() {
		this.getItems("prefix");
		this.getItems("suffix");
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
									<div class="col-md">
										{{ domain.name }}
									</div>
									<div class="col-md text-right">
										<a
											class="btn btn-outline-success"
											v-bind:href="domain.checkout"
											target="_blank"
										>
											<span class="fa fa-shopping-cart"></span>
										</a>
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
