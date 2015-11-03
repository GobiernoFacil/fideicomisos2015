# API fideicomisos

## obtener fideicomisos
endpoint:
/api/fideicomisos/{orderBy?}/{year?}/{order?}/{textfields?}

**orderBy:** El campo numérico para ordenar cada fideicomiso. Solo regresa un registro por fideicomiso, es decir, si hay 10 o más registros para un fideicomiso (uno por año), el que regrese será el que tenga el campo numérico más alto o más bajo (dependiendo del campo “order”).
* default: ‘availability’;
* opciones: ‘income’, ‘yield’, ‘expenses’, ‘availability’, ’initial_amount’, ‘year’. (Si no es ninguno de estos campos, utiliza el de default, que es ‘availability’.)
* ejemplo: /api/fideicomisos/yield

**year:** Se obtienen los fideicomisos agregados para el año seleccionado.
* default: 0 (sin año en particular).
* opciones: 2006 - 2014 (y más, con futuras actualizaciones de la DB).
* ejemplo: /api/fideicomisos/availability/2010

**order:** Si no se seleccionó año, el registro que se obtiene es que el que tiene el valor más alto o más bajo del campo numérico seleccionado. Esto se define pasando 0 para el más bajo, cualquier otro  valor para el más alto.
* default: 0 (orden ascendente).
* opciones: 0 (orden ascendente), cualquier otra cosa (orden descendente)  
* ejemplo: /api/fideicomisos/expenses/0/1

**textfields:** Existen cinco campos con abundante texto que no son parte de la respuesta por default. Estos campos son: ‘designation’, ‘objective’, ‘report’, ‘comments’, ’initial_amount_comments’; si se pasa un valor distinto a cero, se agregan a la respuesta.
* default: 0 (sin los campos de texto extra).
* opciones: 0 (sin los campos de texto extra), cualquier otra cosa (con los campos de texto extra)  
* ejemplo: /api/fideicomisos/expenses/0/1/1

**respuesta:**
* campos de texto: ‘branch’, ‘type’, ‘scope’, ‘unit’, ‘settlor’, ’registry’, ‘fiduciary’, ‘theme’, ‘availability_type’, ’initial_date’.
* campos numéricos: ‘id’, ’income’, ‘yield’, ‘expenses’, ‘availability’, ’initial_amount’, ‘year’.
* campos extra: ‘designation’, ‘objective’, ‘report’, ‘comments’, ’initial_amount_comments’.
* json: 
```json
[
	{
		“id”:227,
		”income”:”0.00”,
		”yield”:”-40343.34”,
		”expenses”:”1568300.31”,
		”availability”:”4483228.61”,
		”initial_amount”:”6147634.46”,
		”year”:2006,
		”branch”:”TRABAJO Y PREVISI\u00d3N SOCIAL”,
		”type”:”FIDEICOMISO”, 
	…}, 
	{…}, 
…]
```
## obtener fideicomiso
endpoint:
/api/fideicomiso/{key}

**key:** Puede ser el id del fideicomiso o su registro. Si se pasa el id, solo regresa una entrada. Si se pasa el registro, se obtienen las entradas para todos los años disponibles del fideicomiso.
* default: none;
* opciones: el id numérico del fideicomiso o el registro
* ejemplos: 
/api/fideicomiso/227 (id)
/api/fideicomiso/700014PDC084 (registro)

**respuesta:**
* campos de texto: ‘branch’, ‘type’, ‘scope’, ‘unit’, ‘settlor’, ’registry’, ‘fiduciary’, ‘theme’, ‘availability_type’, ’initial_date’.
* campos numéricos: ‘id’, ’income’, ‘yield’, ‘expenses’, ‘availability’, ’initial_amount’, ‘year’.
* campos extra: ‘designation’, ‘objective’, ‘report’, ‘comments’, ’initial_amount_comments’.
* json: 
```json
[
	{
		“id”:227,
		”income”:”0.00”,
		”yield”:”-40343.34”,
		”expenses”:”1568300.31”,
		”availability”:”4483228.61”,
		”initial_amount”:”6147634.46”,
		”year”:2006,
		”branch”:”TRABAJO Y PREVISI\u00d3N SOCIAL”,
		”type”:”FIDEICOMISO”, 
	…}, 
	{…}, 
…]
```
## obtener algunos fideicomisos
endpoint:
/api/registros/{registries}

**registries:** una lista de registros separados por un pipe “|”. Cada registro obtienen todas las entradas disponibles para el fideicomiso, muy útil para comparar o agrupar varios fideicomisos sin ninguna relación entre sí. 

* ejemplos: 
/api/registros/700014PDC084
/api/fideicomiso/700014PDC084|20050420001404|20000411301118

**respuesta:**
* campos de texto: ‘branch’, ‘type’, ‘scope’, ‘unit’, ‘settlor’, ’registry’, ‘fiduciary’, ‘theme’, ‘availability_type’, ’initial_date’.
* campos numéricos: ‘id’, ’income’, ‘yield’, ‘expenses’, ‘availability’, ’initial_amount’, ‘year’.
* campos extra: ‘designation’, ‘objective’, ‘report’, ‘comments’, ’initial_amount_comments’.
* json: 
```json
[
	{
		"id":227,
		"income":"0.00",
		"yield":"-40343.34",
		"expenses":"1568300.31",
		"availability":"4483228.61",
		"initial_amount":"6147634.46",
		"year":2006,
		"branch":"TRABAJO Y PREVISI\u00d3N SOCIAL",
		"type”:"FIDEICOMISO", 
	…}, 
	{…}, 
…]
```

## buscar fideicomiso
endpoint:
`/api/busqueda/{query}/{page?}/{total?}`

**query:** la búsqueda a realizar.
* default: none;
* ejemplos: 
/api/busqueda/abc

**page:** la página de resultados. La numeración inicia con cero. 
* default: 0 (la primera página).
* opciones: de cero al número de páginas disponible para la búsqueda
* ejemplo: /api/busqueda/hacienda/5

**total:** el número de resultados por página. 
* default: 50.
* ejemplo: /api/busqueda/hacienda/2/100

**respuesta:**
* campos: 
** “page”: la página actual
** ”pages”: el total de páginas
** ”query_total”: el total de registros encontrados
** ”trusts”: los resultados
* json: 
```json
{
  "page": "2",
  "pages": 24,
  "query_total": 236,
  "trusts": [
    {
      "id": 227,
      "income": "0.00",
      "yield": "-40343.34",
      "expenses": "1568300.31",
      "availability": "4483228.61",
      "initial_amount": "6147634.46",
      "year": 2006,
      "branch": "TRABAJO Y PREVISIÓN SOCIAL",
      "type": "FIDEICOMISO"
    },
    { ... }
  ]
}
