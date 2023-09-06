<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

export default {
	name: "app",
	data: () => {
		return {
			prefix: "",
			sufix: "",
			prefixes: [],
			sufixes: [],
			domains: []
		};
	},
	methods: {}
};
</script>

<template>
	<div>
		<div id="slogan" class="text-center">
			<h1>NameGator</h1>
			<br />
			<h6 class="text-secondary">Gerador de nomes utilizando Vue.js, GraphQL e Node</h6>
		</div>
		<div id="main">
			<div class="container">
				<div class="row">
					<div class="col-md">
						<h5>Prefixos <span class="badge badge-info">{{ prefixes.length }}</span></h5>
						<div class="card">
							<div class="card-body">
								<ul class="list-group">
									<li class="list-group-item">
										<div class="row">
											<div class="col-md">
												{{ prefix }}
											</div>
											<div class="col-md text-right">
												<button class="btn btn-info"><span class="fa fa-trash"></span></button>
											</div>
										</div>
									</li>
								</ul>
								<br />
								<div class="input-group">
									<input class="form-control" type="text" placeholder="Digite o prefixo" />
									<div class="input-group-append">
										<button class="btn btn-info"><span class="fa fa-plus"></span></button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md">
						<h5>Sufixos <span class="badge badge-info"></span></h5>
						<div class="card">
							<div class="card-body">
								<ul class="list-group">
									<li class="list-group-item">
										<div class="row">
											<div class="col-md">
											</div>
											<div class="col-md text-right">
												<button class="btn btn-info"><span class="fa fa-trash"></span></button>
											</div>
										</div>
									</li>
								</ul>
								<br />
								<div class="input-group">
									<input class="form-control" type="text" placeholder="Digite o sufixo" />
									<div class="input-group-append">
										<button class="btn btn-info"><span class="fa fa-plus"></span></button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<br />
				<h5>Domínios <span class="badge badge-info">{{ domains.length }}</span></h5>
				<div class="card">
					<div class="card-body">
						<ul class="list-group">
							<li class="list-group-item">
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
	background-color: #F1F1F1;
	padding-top: 30px;
	padding-bottom: 30px;
}
</style>
