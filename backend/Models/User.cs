using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Ecommerce.Models {
	public class User {
		[Key]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		[EmailAddress]
		[Required]
		public string Email { get; set; }
		[Required]
		public string PasswordHash { get; set; }
		[Required]
		public string PasswordSalt { get; set; }
		public string Phone { get; set; }
		public DateTime BirthDate { get; set; }
		[Required]
		public int Role { get; set; }

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public DateTime Created { get; set; }
	}

	public class UserDTO {
		[Required]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string Email { get; set; }
		public string Phone { get; set; }
		public DateTime BirthDate { get; set; }
		public DateTime Created { get; set; }
		[Required]
		public int Role { get; set; }

		public UserDTO(User user) {
			Id = user.Id;
			Name = user.Name;
			Email = user.Email;
			Phone = user.Phone;
			BirthDate = user.BirthDate;
			Created = user.Created;
			Role = user.Role;
		}
	}
}
