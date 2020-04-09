# Challenge: Nuevo endpoint de creación de información que necesita conexión con api de terceros

- Lanza con postman el endpoint para registrar un candidato.

Request: `POST http://localhost:3000/candidates`

Body:

```json
{
  "name": "Adorne Rolingson",
  "photo": "https://randomuser.me/api/portraits/women/70.jpg",
  "birthDate": "22/9/1995",
  "gender": "F",
  "city": "Pamplona",
}
```

Response:

```json
{
  "name": "Adorne Rolingson",
  "photo": "https://randomuser.me/api/portraits/women/70.jpg",
  "birthDate": "22/9/1995",
  "gender": "F",
  "city": "Pamplona",
  "coordinates": {
    "lat": 42.82,
    "long": -1.65
  }
}
```

- Si el body contiene campos erróneos deber devolver un error 400 Bad Request
- Deberá calcular las coordenadas a partir de la ciudad consultando la [api externa de ciudades](https://raw.githubusercontent.com/posesop/workshop-resources/master/cities.json)
- Deberá tener un test de integración
