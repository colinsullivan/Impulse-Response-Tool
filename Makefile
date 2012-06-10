build: deps styles
	@echo "Build complete!"

LESS_DEPS=./public/css/bootstrap/less/bootstrap.less
LESS=./public/css/main.less
CSS_OUT=./public/css/compiled.css
styles:
	@recess --compile ${LESS} ${LESS_DEPS} > ${CSS_OUT}
	@echo "Building styles..."

deps:
	@echo "Building Twitter Bootstrap framework"
	@cd ./public/css/bootstrap/ && make
	@echo "Building swig for browser"
	@cd ./public/js/libs/swig && make && make browser

