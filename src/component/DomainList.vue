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
			prefix: "",
			sufix: "",
			prefixes: ["Air", "Jet", "Flight"],
			suffixes: ["Hub", "Station", "Mart"],
		};
	},
	methods: {
		addPrefix(prefix) {
			axios({
				baseURL: "http://localhost:4000",
				method: "post",
				data: {
					query: `
						mutation saveItem($item: ItemInput) {
							saveItem(item: $item) {
							id
							type
							description
						}
					}
					`,
					variables: {
						item: {
							type: "prefix",
							description: prefix,
						},
					},
				},
			})
				.then((response) => {
					const query = response.data;
					const newPrefix = query.data.saveItem;
					this.prefixes.push(newPrefix.description);
				})
				.catch(({ response }) =>
					console.error("[ERROR CREATE PREFIXES]", response)
				);
		},
		deletePrefix(prefix) {
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
						id: prefix.id,
					},
				},
			})
				.then(() => {
					this.getPrefixes();
				})
				.catch(({ response }) =>
					console.error("[ERROR DELETE PREFIXES]", response)
				);
		},
		addSufix(sufix) {
			this.suffixes.push(sufix);
			this.sufix = "";
		},
		deleteSufix(sufix) {
			this.suffixes.splice(this.suffixes.indexOf(sufix), 1);
		},

		getPrefixes() {
			axios({
				baseURL: "http://localhost:4000",
				method: "post",
				data: {
					query: `
					query {
						prefixes: items (type: "prefix") {
							id
							type
							description
						}
					}
				`,
				},
			})
				.then((response) => {
					const query = response.data;
					const newPrefix = query.data.prefixes;
					this.prefixes = newPrefix;
				})
				.catch(({ response }) =>
					console.error("[ERROR GET PREFIXES]", response)
				);
		},
		getSuffixes() {
			axios({
				baseURL: "http://localhost:4000",
				method: "post",
				data: {
					query: `
					query {
						prefixes: items (type: "sufix") {
							id
							type
							description
						}
					}
				`,
				},
			})
				.then(({ data: { data } }) => {
					const query = data.prefixes;
					this.suffixes = query;
				})
				.catch(({ response }) =>
					console.error("[ERROR GET SUFFIXES]", response)
				);
		},
	},

	computed: {
		domains() {
			const domains = [];
			for (const prefix of this.prefixes) {
				for (const suffix of this.suffixes) {
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
		this.getPrefixes();
		this.getSuffixes();
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
							v-bind:items="prefixes"
							v-on:add-item="addPrefix"
							v-on:delete-item="deletePrefix"
						/>
					</div>
					<div class="col-md">
						<AppItemListComponent
							title="Sufixos"
							v-bind:items="suffixes"
							v-on:add-item="addSufix"
							v-on:delete-item="deleteSufix"
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
