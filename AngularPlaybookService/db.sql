USE [AngularPlaybook]
GO

/****** Object:  Table [dbo].[Portfolios]    Script Date: 2/5/2021 8:10:04 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Portfolios](
	[PortfolioId] [int] IDENTITY(1,1) NOT NULL,
	[Symbol] [nvarchar](500) NOT NULL,
	[StockName] [nvarchar](500) NOT NULL,
	[StockLastPrice] [decimal](18, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[PortfolioId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


