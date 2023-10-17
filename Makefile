.PHONY: install fix check

install:
	npm install

fix: install
	npm run fix-all

check: install
	npm run check-all
