using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Models {
	public class Product {
		[Key]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		public string Description { get; set; }
		[Required]
		public double CostPrice { get; set; }
		[Required]
		public double SalePrice { get; set; }
		[Required]
		public int StockAmount { get; set; }
		[Required]
		public bool Status { get; set; }

		[ForeignKey("Category")]
		public int CategoryId { get; set; }

		[Required]
		public Category Category { get; set; }

		public static implicit operator ProductDTO(Product product) {
			return new() {
				Name = product.Name,
				CostPrice = product.CostPrice,
				SalePrice = product.SalePrice,
				StockAmount = product.StockAmount,
				Status = product.Status,
				Category = product.Category,
				CategoryId = product.CategoryId,
			};
		}
	}

	public class ProductDTO {
		public string Name { get; set; }
		public double CostPrice { get; set; }
		public double SalePrice { get; set; }
		public int StockAmount { get; set; }
		public bool Status { get; set; }
		public Category Category { get; set; }

		[ForeignKey("Category")]
		public int CategoryId { get; set; }

		public static implicit operator Product(ProductDTO product) => new() {
			Name = product.Name,
			CostPrice = product.CostPrice,
			SalePrice = product.SalePrice,
			StockAmount = product.StockAmount,
			Status = product.Status,
			CategoryId = product.CategoryId,
		};
	}
}
