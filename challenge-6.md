# Challenge: Nuevo endpoint de creación de información que necesita conexión con api de terceros

- Lanza con postman el endpoint para obtener los candidatos que matchean contigo con paginación.
- Para considerar que un candidato es match se tendrá en cuenta la afinidad.
La afinidad se calcula en base a varios parámetros. Un factor es la edad, si es entre +5 o -5. Otro factor es la proximidad, deberá estar comprendida en un radio máximo de 100km.
- Si los path params (candidateId) tiene un formato erróneo deberá devolver un error 400 Bad Request. *Nota*: Los objectid de mongo siguen la regexp /^[0-9a-fA-F]{24}$/
- Si el candidato no existe deberá devolvuer un error 404 not found.

Request: `GET http://localhost:3000/candidates/:candidateId/matches`

Response:

```json
{
    "data": [
        {
            "_id": "5e8b47ace9ea099dbf055bff",
            "name": "Anna Morcillo",
            "photo": "https://randomuser.me/api/portraits/women/95.jpg",
            "birthDate": "21/07/1985",
            "gender": "F",
            "city": "Mataro",
            "coordinates": {
                "lat": 41.54,
                "long": 2.45
            }
        },
        {
            "_id": "5e8b47ace9ea099dbf055c00",
            "name": "Jesús Antón",
            "photo": "https://randomuser.me/api/portraits/men/83.jpg",
            "birthDate": "12/03/1997",
            "gender": "M",
            "city": "Salamanca",
            "coordinates": {
                "lat": 40.9704,
                "long": -5.67
            }
        }
    ],
    "pagination": {
        "limit": "2",
        "offset": "1"
    }
}
```

Response filtros érroneos:

```json
{
    "status": 400,
    "code": "kaitinder-1",
    "description": "The server cannot or will not process the request due to an apparent client error.",
    "data": {
        "errors": [
            {
                "field": "limit",
                "type": "string.pattern.base",
                "message": "\"limit\" with value \"foo\" fails to match the required pattern: /^\\d+$/"
            }
        ]
    }
}
```

Response no encontrado:

```json
{
    "status": 404,
    "code": "kaitinder-1",
    "description": "The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible."
}
```
