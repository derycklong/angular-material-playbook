USE [AngularPlaybook]
GO

/****** Object:  Table [dbo].[Tickers]    Script Date: 5/5/2021 4:31:58 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Tickers](
	[TickerId] [int] IDENTITY(1,1) NOT NULL,
	[Symbol] [nvarchar](500) NOT NULL,
	[StockName] [nvarchar](500) NOT NULL,
	[StockLastPrice] [decimal](18, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[TickerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO






USE [AngularPlaybook]
GO

/****** Object:  Table [dbo].[Transactions]    Script Date: 5/5/2021 4:32:18 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Transactions](
	[TransactionId] [int] IDENTITY(1,1) NOT NULL,
	[TickerId] [int] NOT NULL,
	[TransactionType] [nvarchar](50) NOT NULL,
	[TransactionPrice] [decimal](18, 2) NOT NULL,
	[TransactionQuantity] [float] NOT NULL,
	[TransactionDate] [datetime] NULL,
 CONSTRAINT [PK_Transactions] PRIMARY KEY CLUSTERED 
(
	[TransactionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD FOREIGN KEY([TickerId])
REFERENCES [dbo].[Tickers] ([TickerId])
GO


