using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace CelebApp.Models
{
    public class Celebs
    {
        private Dictionary<Guid, Celeb> data = null;
        public Celebs(){
            data = HardDisk.Instance.data;
        }
        public List<Celeb> GetAllCelebs()
        {
            return data.Values.ToList();
        }

        public Celeb GetByID(Guid id)
        {
            return data[id];
        }

        public void DeleteByID(Guid id)
        {
            data.Remove(id);
            HardDisk.Instance.WriteToFile(data);
        }

        public void UpdateByID(Guid id, string country, string name, int age)
        {
            Celeb updateCeleb = new Celeb();
            updateCeleb.id = id;
            updateCeleb.country = country;
            updateCeleb.name = name;
            updateCeleb.age = age;
            data[id] = updateCeleb;
            HardDisk.Instance.WriteToFile(data);
        }
        public void Create(string country, string name, int age)
        {
            Celeb newCeleb = new Celeb();
            newCeleb.id = Guid.NewGuid();
            newCeleb.country = country;
            newCeleb.name = name;
            newCeleb.age = age;
            data.Add(newCeleb.id, newCeleb);
            HardDisk.Instance.WriteToFile(data);
        }

        

    }
    public class Celeb
    {
        public Guid id { get; set; }
        public string name { get; set; }
        public int age { get; set; }
        public string country { get; set; }

    }
    public class HardDisk
    {
        /* Design Pattern - Singleton */
        private static HardDisk instance;
        public List<Celeb> dataList;
        public Dictionary<Guid, Celeb> data = new Dictionary<Guid, Celeb>();
        private string path = "./resources/celebs.json";
        private HardDisk()
        {
            ReadFromFile();
        }
        public static HardDisk Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new HardDisk();

                }
                return instance;
            }
        }
        public void ReadFromFile()
        {
            using (StreamReader r = new StreamReader(path))
            {
                string json = r.ReadToEnd();
                dataList = JsonConvert.DeserializeObject<List<Celeb>>(json);
            }
            foreach (Celeb celeb in dataList){
                Guid newGuid = Guid.NewGuid();
                celeb.id = newGuid;
                data.Add(newGuid, celeb);
            }
        }
        public void WriteToFile(Dictionary<Guid, Celeb> newData)
        {
            using (System.IO.StreamWriter file = new System.IO.StreamWriter("./resources/celebs.json",false))
            {
                file.Write(JsonConvert.SerializeObject(newData.Values.ToList()));
            }
        }
        
    }
}