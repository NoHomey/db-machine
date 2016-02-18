clean:
	rm -Rf build

solve: clean
	tsc -p .
	node built/solve.js
  
 check: 
	mysql -u root -p