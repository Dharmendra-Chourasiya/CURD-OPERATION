using Newtonsoft.Json;
using SampleTest.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SampleTest.Controllers
{
    public class ValuesController : ApiController
    {

        SqlConnection con = new SqlConnection(@"server=CHHB9U7N216\MSSQLSERVER2019; database=TestEmployee;Integrated security=true");
       
        // GET api/values
        public string Get()
        {
            SqlDataAdapter da = new SqlDataAdapter("Select * from Employee",con);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                return JsonConvert.SerializeObject(dt);
            }
            else
            {
                return "No data Found";
            }
        }

        // GET api/values/5
        public string Get(int id)
        {
            //return "Welcome Dharmendra";
            SqlDataAdapter da = new SqlDataAdapter("Select * from Employee where Id='"+id+"'", con);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                return JsonConvert.SerializeObject(dt);
            }
            else
            {
                return "No data Found";
            }

        }

        // POST api/values
        public string Post([FromBody] Contact value)  //add
        {
            // return value +"Added Successfully";
              SqlCommand cmd = new SqlCommand("Insert into Employee(emp_code,name,email,designation,join_date,padd1,padd2,cadd1,cadd2) values('"+value.emp_code+"','"+value.Name + "','"+ value.Email + "','" + value.designation + "','" + value.join_date + "','" + value.padd1 + "','" + value.padd2 + "','" + value.cadd1 + "','" + value.cadd2 + "')",con);
              con.Open();
              int i = cmd.ExecuteNonQuery();
              con.Close();
              if (i == 1)
              {
                  return "record Inserted With the value As " + value;
              }
              else
              {
                  return "Try-again no data inserted";
              }
           
        }

        // PUT api/values/5
        public string Put(int id, [FromBody] Contact value) //update
        {
            //return value+ "Update successfully with Id "+ id
            SqlCommand cmd = new SqlCommand("Update Employee set emp_code='" + value.emp_code + "', Name='" + value.Name + "', Email='" + value.Email + "',Designation='" + value.designation + "',join_date='" + value.join_date + "',padd1='" + value.padd1 + "',padd2='" + value.padd2 + "',cadd1='" + value.cadd1 + "',cadd2='" + value.cadd2 + "' where ID='" + id +"' ", con);
            con.Open();
            int i = cmd.ExecuteNonQuery();
           
            con.Close();
            if (i == 1)
            {
                return  "record Updated With the value As " +  value +" and Id as "+ id;
            }
            else
            {
                return " Try-again no data inserted ";
            }
        }

        // DELETE api/values/5
        public string Delete(int id)
        {
            // return "Delete successfully "+ id;
            SqlCommand cmd = new SqlCommand("Delete From Employee where ID='" + id +"' ", con);
            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();
            if (i == 1)
            {
                SqlDataAdapter da = new SqlDataAdapter("Select * from Employee", con);
                DataTable dt = new DataTable();
                da.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    return JsonConvert.SerializeObject(dt);
                }
                else
                {
                    return "No data Found";
                }
            }
            else
            {
                return "Try-again no data inserted";
            }
        }
    }
}
