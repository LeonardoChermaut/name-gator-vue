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
			sufixes: ["Hub", "Station", "Mart"],
		};
	},
	methods: {
		addPrefix(prefix) {
			this.prefixes.push(prefix);
			this.prefix = "";
		},
		deletePrefix(prefix) {
			this.prefixes.splice(this.prefixes.indexOf(prefix), 1);
		},
		addSufix(sufix) {
			this.sufixes.push(sufix);
			this.sufix = "";
		},
		deleteSufix(sufix) {
			this.sufixes.splice(this.sufixes.indexOf(sufix), 1);
		},
	},
	computed: {
		domains() {
			const domains = [];
			for (const prefix of this.prefixes) {
				for (const sufix of this.sufixes) {
					const name = prefix + sufix;
					const url = name.toLowerCase();
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
						sufixes: items (type: "sufix") {
							description
						}
					}
				`,
			},
		})
			.then(({ data: { data } }) => {
				console.log(data);
				const query = data.prefixes;
				this.prefixes = query.map((item) => item.description);
				this.sufixes = data.sufixes.map((item) => item.description);
			})
			.catch(({ response }) => console.error(response));
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
							v-bind:items="sufixes"
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
								v-for="domain in domains"
								v-bind:key="domain.name"
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
