using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CelebApp.Models;
using Newtonsoft.Json;

namespace CelebApp.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        Celebs celbsList = new Celebs();
        // GET api/values
        [HttpGet]
        public string Get()
        {
            var jsonCelebs = JsonConvert.SerializeObject(celbsList.GetAllCelebs());
            return jsonCelebs;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(Guid id)
        {
            var jsonCeleb = JsonConvert.SerializeObject(celbsList.GetByID(id));
            return jsonCeleb;
        }

        // POST api/values
        [HttpPost]
        public void Post(string cmd, Guid id, string country, string name, int age)
        {
            switch (cmd)
            {
                case "update":
                    celbsList.UpdateByID(id, country, name, age);
                    break;
                case "create":
                    celbsList.Create(country, name, age);
                    break;
                default:
                    break;
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            celbsList.DeleteByID(id);
        }
    }
}
